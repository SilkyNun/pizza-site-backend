import { CreateAdditiveDto } from "src/additive/dto/create-additive.dto";
import { CreateAddonDto } from "src/addon/dto/create-addon.dto";

export enum Dough {
    THIN = 'Тонкое',
    TRADITIONAL = 'Традиционное'
}

export enum Type {
    MEAT = 'Мясная',
    VEGAN = 'Вегетарианская'
}

export enum Size {
    SMALL = 20,
    MEDIUM = 25,
    BIG = 30
}

export const PizzaImage = 'https://dodopizza-a.akamaihd.net/static/Img/Products/7273443959dd46acb02db816f176235c_760x760.jpeg';

export const Ingredients = [
    'Ветчина',
    'Соус барбекю',
    'Сладкий перец',
    'Томаты',
    'Моцарелла',
    'Соус ранч',
    'Итальянские травы',
    'Томатный соус',
    'Томаты',
    'Пикантная пепперони',
    'Кубики брынзы',
    'Моцарелла',
    'Шампиньоны',
    'Маринованные огурчики',
    'Чеснок',
    'Красный лук',
    'Митболы из говядины'
];

export const Pizzas = [
    'Мясной Микс',
    'Белая пепперони',
    'Ветчина бакбекю',
    'Четыре сезона',
    'Домашняя',
    'Карбонара',
    'Додо Микс',
    'Чоризо фреш',
    'Пепперони',
    'Аррива!',
    'Додо',
    'Ветчина и огурчики',
    'Песто',
    'Цепленок ранч',
    'Цыпленок барбекю',
    'Ветчина и сыр',
    'Гавайская',
    'Деревенская',
    'Сырный цыпленок',
    'Ветчина и грибы',
    'Супермясная',
    'Чизбургер-пиццы',
    'Итальянская',
    'Пепперони фреш',
    'Мясная',
    'Диабло',
    'Колбаски барбекю',
    'Сырная',
    'Овощи и грибы',
    'Четыре сыра',
    'Двойная пепперони',
    'Двойной цыпленок',
    'Маргарита'
]

export const Addons: Array<CreateAddonDto> = [
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD1DBB21AA',
        name: 'Острый халапеньо',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD8A35FD03',
        name: 'Чеддер и пармезан',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/74c62256e82a4a78a646251490446369.png',
        name: 'Моцарелла',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD52EEF6AB',
        name: 'Острая чоризо',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/80ec81ec3d034f8dbae515baf85acb4f.png',
        name: 'Митболы',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD72ED2820',
        name: 'Ананасы',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD10EF7B80',
        name: 'Цыпленок',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD64FE3988',
        name: 'Томаты',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD4B066CBC',
        name: 'Пикантная пепперони',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD96854BA8',
        name: 'Брынза',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD273248DA',
        name: 'Маслины',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9EA89CD3AAAFB',
        name: 'Маринованные огурчики',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD369D06C3',
        name: 'Красный лук',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD6055062E',
        name: 'Сладкий перец',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/36cf2411c86f46ebae8878ca1e2cc7b2.png',
        name: 'Итальянские травы',
        price: 2.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD42D4B952',
        name: 'Ветчина',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A262427A95111E9DBAD58DE3CB9',
        name: 'Бекон',
        price: 2.80
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A219740A95611E9DBAD6D51B919',
        name: 'Шампиньоны',
        price: 2.00
    }
];

export const Additives: Array<CreateAdditiveDto> = [
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/8171ad2027744556aa7b0ce4f5f5caef_1875x1875.jpeg',
        name: 'Сырный соус',
        price: 1.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/0747d74a483e4b69b350c49d664a453b_1875x1875.jpeg',
        name: 'Барбекю',
        price: 1.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/46a55233d96747aabc71d92a80c5b746_1875x1875.jpeg',
        name: 'Ранч',
        price: 1.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/c854e4bd3bcc42c68162b773a56ad11e_1875x1875.jpeg',
        name: 'Малиновое варенье',
        price: 1.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/14e1f4abbda94e099af56e943f12650b_1875x1875.png',
        name: 'Соус Чесночный Хайнц',
        price: 1.00
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/c0a0cdcb71514025a75a4b2f56e3bbe1_183x183.jpeg',
        name: 'Pepsi, 0.5л',
        price: 3.30
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/a3f53c16e0a14529a588c8074888560d_183x183.jpeg',
        name: 'Додстер',
        price: 6.90
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/bfcc2f92ab8344da92e192d13a17309f_183x183.jpeg',
        name: 'Картофель и печи, большой',
        price: 6.90
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/73873900fabd4d89a19c5f4decf80770_183x183.jpeg',
        name: 'Слоеные палочки с брусникой',
        price: 8.90
    },
    {
        image: 'https://dodopizza-a.akamaihd.net/static/Img/Products/d22516b121ec41eea49e7b03b5a2bfec_183x183.jpeg',
        name: '2 Маффина Три шоколада',
        price: 7.00
    },
]
