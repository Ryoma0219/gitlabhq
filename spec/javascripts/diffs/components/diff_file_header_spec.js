import diffDiscussionsMockData from '../mock_data/diff_discussions';
import { diffViewerModes } from '~/ide/constants';
  const diffDiscussionMock = diffDiscussionsMockData;
        props.diffFile.viewer.name = diffViewerModes.renamed;
        expect(filePaths()[0]).toHaveText(props.diffFile.old_path_html);
        expect(filePaths()[1]).toHaveText(props.diffFile.new_path_html);
      expect(button.dataset.clipboardText).toBe('{"text":"CHANGELOG.rb","gfm":"`CHANGELOG.rb`"}');
        props.diffFile.viewer.name = diffViewerModes.mode_changed;
        props.diffFile.viewer.name = diffViewerModes.text;