$(document).ready(function() {
  zE(function() {
    $zopim(function() {
      $zopim.livechat.setOnConnected(function() {
        // Chat is in it's own iframe, so must access that
        const chatIframe = $(".zopim iframe");

        // Calls function to get browser language
        //const currentLanguageCode = getCurrentLanguageCode();

        // Gets language from url path
        if(window.location.href.indexOf("/fr-CA") > -1) {
          const currentLanguageCode = 'fr-ca';
        }

        // Include Chat departments you want to display for each locale
        // Department names on left side of colon must match exactly to those in Chat settings
        // Translations on right side of colon - if no translation necessary, just copy department name as-is to right side
        // See full list of language codes here: https://support.zendesk.com/hc/en-us/articles/203761906-Language-codes-for-Zendesk-supported-languages
        const translatedDepartmentNames = {
          "en-US": {
            "Dealer NA":
              "Dealer North America"
          },
          sv: {
          },
          da: {
          },
          "fr-ca": {
            "Dealer NA":
              "Détaillant Amérique du Nord", // Change this to the french version
          }
        };

        const currentLanguageTranslatedDepartmentNames =
          translatedDepartmentNames[currentLanguageCode || "en-US"]; // default to en-US if no entry found for user locale

        const allDepartments = $zopim.livechat.departments.getAllDepartments();

        // Only display departments listed in
        const departmentsFilteredForLocale = $zopim.livechat.departments.filter.apply(
          this,
          Object.keys(currentLanguageTranslatedDepartmentNames)
        );

        // for each department, replace the name in the select dropdown with the translated name
        allDepartments.forEach(department => {
          chatIframe
            .contents()
            .find("option[value='" + department.id + "']")
            .text(currentLanguageTranslatedDepartmentNames[department.name]);
        });

        // also replace the selected name in the select dropdown placeholder
        chatIframe
          .contents()
          .find(".select_placeholder")
          .text(
          	chatIframe
              .contents()
              .find("select[name='department_id'] option:selected")
              .text()
          );
      });

      if( currentLanguageCode == 'fr-ca' ){
        $zopim.livechat.set({
            language: 'fr',
        });
      }

    });

  });
});

// Checks the browser language regardless of the version of the site they are on
function getCurrentLanguageCode() {
  return window.navigator.languages
    ? window.navigator.languages[0]
    : window.navigator.userLanguage || window.navigator.language;
}
