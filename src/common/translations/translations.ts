type SupportedLanguages = 'en';
type Translations = Record<SupportedLanguages, Record<string, string>>;

export const translations: Translations = {
  en: {
    main: 'Main',
    password_generator: 'Password generator',
    recently_deleted: 'Recently deleted',
    settings: 'Settings',
    update: 'Update',
    delete: 'Delete',
    show: 'Show',
    hide: 'Hide',
    copy_link: 'Copy link',
    card_title: 'Card title',
    login: 'Login',
    password: 'Password',
    website_url: 'Website url',
    notes: 'Notes',
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    generate_password: 'Generate password',
    generate: 'Generate',
    regenerate: 'Regenerate',
    copied_to_clipboard: 'Copied to clipboard',
    copy_to_clipboard: 'Copy to clipboard',
    apply_password: 'Apply password',
    enter: 'Enter',
    edit: 'Edit',
    open_in_browser: 'Open in browser'
  }
};
