export const PAGES_MENU = [
  {
    path: 'competition',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'scores',
        data: {
          menu: {
            title: 'Scores',
            icon: 'ion-android-checkbox-outline',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'pizza',
        data: {
          menu: {
            title: 'Pizza',
            icon: 'ion-android-restaurant',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'Settings',
            icon: 'ion-android-settings',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        // parent route
        path: '',
        data: {

          // parent menu configuration
          menu: {
            title: 'Downloads',
            icon: 'ion-android-download',
            selected: false,
            expanded: false,
            order: 200,
          }
        },

        // children routes
        children: [
          {
            path: '',
            data: {

              // children menu item configuration
              menu: {
                title: 'PC^2',
                url: '/assets/download/sampledata.zip'
              }
            }
          },
          {
            path: '',
            data: {

              // children menu item configuration
              menu: {
                title: 'Sample Data',
                url: '/assets/downloads/sampledata.zip'
              }
            }
          }
        ]
      }
    ]
  }
];
