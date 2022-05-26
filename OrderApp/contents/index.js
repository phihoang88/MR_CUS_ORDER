const listMenu = [
    {
        menu_id: 1,
        menu_nm: 'Menu 1',
        menu_image: require('../assets/images/meal1.jpg'),
    },
    {
        menu_id: 2,
        menu_nm: 'Menu 2',
        menu_image: require('../assets/images/meal2.jpg'),
    },
    {
        menu_id: 3,
        menu_nm: 'Menu 3',
        menu_image: require('../assets/images/meal3.jpg'),
    },
    {
        menu_id: 4,
        menu_nm: 'Menu 4',
        menu_image: require('../assets/images/meal4.jpg'),
    },
    {
        menu_id: 5,
        menu_nm: 'Combo 1',
        menu_image: require('../assets/images/meal5.jpg'),
    },
    {
        menu_id: 6,
        menu_nm: 'Combo 2',
        menu_image: require('../assets/images/meal6.jpg'),
    }
    , {
        menu_id: 7,
        menu_nm: 'Combo 3',
        menu_image: require('../assets/images/meal7.png'),
    },
    {
        menu_id: 8,
        menu_nm: 'Combo 4',
        menu_image: require('../assets/images/meal8.png'),
    },
    {
        menu_id: 9,
        menu_nm: 'Combo 5',
        menu_image: require('../assets/images/meal9.png'),
    },
    {
        menu_id: 10,
        menu_nm: 'Combo 6',
        menu_image: require('../assets/images/meal10.png'),
    }
]

const listMenu1 = [
    {
        meal_id: 1,
        meal_nm: 'Meal1',
        meal_price: 1000,
        meal_image: require('../assets/images/meal1.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 2,
        meal_nm: 'Meal2',
        meal_price: 2000,
        meal_image: require('../assets/images/meal2.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 3,
        meal_nm: 'Meal3',
        meal_price: 3000,
        meal_image: require('../assets/images/meal3.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 4,
        meal_nm: 'Meal4',
        meal_price: 4000,
        meal_image: require('../assets/images/meal4.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 5,
        meal_nm: 'Meal5',
        meal_price: 5000,
        meal_image: require('../assets/images/meal5.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 6,
        meal_nm: 'Meal6',
        meal_price: 6000,
        meal_image: require('../assets/images/meal6.jpg'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 7,
        meal_nm: 'Meal7',
        meal_price: 7000,
        meal_image: require('../assets/images/meal7.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 8,
        meal_nm: 'Meal8',
        meal_price: 8000,
        meal_image: require('../assets/images/meal8.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh'
        + 'dkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdasdasdsadasdqwwdwqádjkasjdhaksdjkshdkjadhkasdhkjs'
        + 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadasdasdsadsdfsdfsdfsdfádjkasjdhaksdjkshdkj' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },

]

const listMenu2 = [
    {
        meal_id: 9,
        meal_nm: 'Meal9',
        meal_price: 9000,
        meal_image: require('../assets/images/meal9.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 10,
        meal_nm: 'Meal10',
        meal_price: 10000,
        meal_image: require('../assets/images/meal10.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 11,
        meal_nm: 'Meal11',
        meal_price: 11000,
        meal_image: require('../assets/images/combo1.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
    {
        meal_id: 12,
        meal_nm: 'Meal12',
        meal_price: 12000,
        meal_image: require('../assets/images/combo2.png'),
        meal_descript: 'ádjkasjdhaksdjkshdkjadhkasdhkjshdkjasdasdsadasdasdsadádasdasdadádjkasjdhaksdjksh' 
        + 'adhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwadhkasdhkjshdkjasdasdsadasdasdsadqưewqdqwasdasjdhdkah'
    },
]

function getMenuListById(id) {
    switch (id) {
        case 1:
            return listMenu1
        case 2:
            return listMenu2
        case 3:
            return []
        case 4:
            return []
        case 5:
            return []
        case 6:
            return []
        case 7:
            return []
        case 8:
            return []
        case 9:
            return []
        case 10:
            return []
    }
}

const listOrder = [
    {
        meal_id: 1,
        meal_nm: 'Meal 112e12e12e2e',
        meal_image: require('../assets/images/meal1.jpg'),
        meal_price: 1500,
        meal_count: 2
    },
    {
        meal_id: 2,
        meal_nm: 'Meal 2',
        meal_image: require('../assets/images/meal2.jpg'),
        meal_price: 2500,
        meal_count: 1
    },
    {
        meal_id: 3,
        meal_nm: 'Meal 3',
        meal_image: require('../assets/images/meal3.jpg'),
        meal_price: 3500,
        meal_count: 3
    },
    {
        meal_id: 4,
        meal_nm: 'Meal 4',
        meal_image: require('../assets/images/meal4.jpg'),
        meal_price: 4500,
        meal_count: 1
    },
    {
        meal_id: 5,
        meal_nm: 'Meal 5',
        meal_image: require('../assets/images/meal5.jpg'),
        meal_price: 1500,
        meal_count: 2
    },
    {
        meal_id: 6,
        meal_nm: 'Meal 6',
        meal_image: require('../assets/images/meal6.jpg'),
        meal_price: 2500,
        meal_count: 1
    },
]

function getMealById(menu_id, meal_id) {
    switch (menu_id) {
        case 1:
            return listMenu1.find(item => item.meal_id === meal_id)
        case 2:
            return listMenu2.find(item => item.meal_id === meal_id)
    }
}




export {
    listMenu,
    getMenuListById,
    listOrder,
    getMealById
}