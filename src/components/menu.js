export const menuItems = [
   
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ri-dashboard-line',
      
        link: '/'
    },
    {
        id: 3,
        label: 'FS',
        icon: 'ri-dashboard-line',
      
        link: '/fs'
    },

    {
        id: 5,
        label: 'Derivatives',
        icon: 'ri-file-settings-line',
        subItems: [
            {
                id: 6,
                label: 'Binance',
                link: '/derivatives/binance'
            },
            {
                id: 7,
                label: 'FTX',
                link: '/derivatives/ftx'
            },
          
        ]
    },
   
]