class ProtectedBranch::PushAccessLevel < ActiveRecord::Base
  belongs_to :protected_branch
  delegate :project, to: :protected_branch

  enum access_level: [:masters, :developers, :no_one]

  def self.human_access_levels
    {
      "masters" => "Masters",
      "developers" => "Developers + Masters",
      "no_one" => "No one"
    }.with_indifferent_access
  end

  def check_access(user)
    return false if no_one?
    return true if user.is_admin?

    min_member_access = if masters?
                          Gitlab::Access::MASTER
                        elsif developers?
                          Gitlab::Access::DEVELOPER
                        end

    project.team.max_member_access(user.id) >= min_member_access
  end

  def humanize
    self.class.human_access_levels[self.access_level]
  end
end
