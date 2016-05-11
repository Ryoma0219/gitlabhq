module Notes
  class CreateService < BaseService
    def execute
      note = project.notes.new(params)
      note.author = current_user
      note.system = false

      if note.award_emoji?
        return ToggleAwardEmojiService.new(project, current_user, params).
                                        execute(note.noteable, note.note)
      end

      return unless valid_project?(note)

      if note.save
        # Finish the harder work in the background
        NewNoteWorker.perform_in(2.seconds, note.id, params)
        TodoService.new.new_note(note, current_user)
      end

      note
    end

    private

    def valid_project?(note)
      return false unless project
      return true if note.for_commit?

      note.noteable.try(:project) == project
    end
  end
end
