require('./filtered_search_dropdown');

/* global droplabFilter */

(() => {
  class DropdownHint extends gl.FilteredSearchDropdown {
    constructor(droplab, dropdown, input, filter) {
      super(droplab, dropdown, input, filter);
      this.config = {
        droplabFilter: {
          template: 'hint',
          filterFunction: gl.DropdownUtils.filterHint.bind(null, input),
        },
      };
    }

    itemClicked(e) {
      const { selected } = e.detail;

      if (selected.tagName === 'LI') {
        if (selected.hasAttribute('data-value')) {
          this.dismissDropdown();
        } else if (selected.getAttribute('data-action') === 'submit') {
          this.dismissDropdown();
          this.dispatchFormSubmitEvent();
        } else {
          const token = selected.querySelector('.js-filter-hint').innerText.trim();
          const tag = selected.querySelector('.js-filter-tag').innerText.trim();

          if (tag.length) {
            // Get previous input values in the input field and convert them into visual tokens
            const previousInputValues = this.input.value.split(' ');
            const searchTerms = [];

            previousInputValues.forEach((value, index) => {
              searchTerms.push(value);

              if (index === previousInputValues.length - 1 && token.indexOf(value) !== -1) {
                searchTerms.pop();
              }
            });

            if (searchTerms.length > 0) {
              gl.FilteredSearchVisualTokens.addSearchVisualToken(searchTerms.join(' '));
            }

            gl.FilteredSearchDropdownManager.addWordToInput(token.replace(':', ''));
          }
          this.dismissDropdown();
          this.dispatchInputEvent();
        }
      }
    }

    renderContent() {
      const dropdownData = [];

      [].forEach.call(this.input.closest('.filtered-search-input-container').querySelectorAll('.dropdown-menu'), (dropdownMenu) => {
        const { icon, hint, tag } = dropdownMenu.dataset;
        if (icon && hint && tag) {
          dropdownData.push({
            icon: `fa-${icon}`,
            hint,
            tag: `&lt;${tag}&gt;`,
          });
        }
      });

      this.droplab.changeHookList(this.hookId, this.dropdown, [droplabFilter], this.config);
      this.droplab.setData(this.hookId, dropdownData);
    }

    init() {
      this.droplab.addHook(this.input, this.dropdown, [droplabFilter], this.config).init();
    }
  }

  window.gl = window.gl || {};
  gl.DropdownHint = DropdownHint;
})();
