interface SeedRecipe {
  title: string;
  mainTitle: string;
  portion_size: string;
  preparation_minutes: string;
  difficulty: string;
  category: string;
  score: string;
  favorite: boolean;
  image: string;
}

interface SeedRecipesData {
  recipes: SeedRecipe[];
}

export const seedRecipesData: SeedRecipesData = {
  recipes: [
    {
      title: 'mixto',
      mainTitle: 'veggy',
      portion_size: '1 ración',
      preparation_minutes: '38',
      difficulty: 'media',
      category: 'vegetariana',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/hj0nmy6vagr2ylsaby54.png',
    },
    {
      title: 'sagú',
      mainTitle: 'nora',
      portion_size: '1 ración',
      preparation_minutes: '10',
      difficulty: 'difícil',
      category: 'principales',
      score: '4.5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/ee6nvm7fxoognmcy0mrk.png',
    },
    {
      title: 'veggy',
      mainTitle: 'mörgåstårta',
      portion_size: '1 ración',
      preparation_minutes: '10',
      difficulty: 'media',
      category: 'vegetariana',
      score: '4.7',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432727/recipes-app/nlsz0w5vllzvkqutuvum.png',
    },
    {
      title: 'pasta',
      mainTitle: 'con nuez',
      portion_size: '1 ración',
      preparation_minutes: '30',
      difficulty: 'media',
      category: 'vegetariana',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432725/recipes-app/ykwrq4aokw5llmkolpvc.png',
    },
    {
      title: 'salmon',
      mainTitle: 'al vino',
      portion_size: '1 ración',
      preparation_minutes: '18',
      difficulty: 'difícil',
      category: 'vegetariana',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/od9nqxuowlwklqxvvfme.png',
    },
    {
      title: 'tortilla',
      mainTitle: 'veggy',
      portion_size: '1 ración',
      preparation_minutes: '15',
      difficulty: 'fácil',
      category: 'vegetariana',
      score: '4.6',
      favorite: true,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/fkmuryedbgnvpgenesml.png',
    },
    {
      title: 'papas',
      mainTitle: 'bravas',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'principales',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432725/recipes-app/hvk15oxelvc8t1blcujo.png',
    },
    {
      title: 'picada',
      mainTitle: 'montecristo',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'principales',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/yuahpohcawrsjbfv6fd3.png',
    },
    {
      title: 'bowl',
      mainTitle: 'mediterraneo',
      portion_size: '1 ración',
      preparation_minutes: '37',
      difficulty: 'difícil',
      category: 'principales',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432725/recipes-app/ii6idgqkfqz3hjeqbkdw.png',
    },
    {
      title: 'oriente',
      mainTitle: 'salad',
      portion_size: '1 ración',
      preparation_minutes: '16',
      difficulty: 'fácil',
      category: 'principales',
      score: '4.4',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432725/recipes-app/ruaio18y3jkltvyr9osz.png',
    },
    {
      title: 'mix',
      mainTitle: 'salad',
      portion_size: '1 ración',
      preparation_minutes: '15',
      difficulty: 'fácil',
      category: 'principales',
      score: '5',
      favorite: true,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432725/recipes-app/cfymgtcgbawycau7wg3f.png',
    },
    {
      title: 'suspiro',
      mainTitle: 'limeño',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'principales',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670432726/recipes-app/c4eo7lyejp5xvhudrh8a.png',
    },
    {
      title: 'torta',
      mainTitle: 'de chocolate',
      portion_size: '10',
      preparation_minutes: '42',
      difficulty: 'fácil',
      category: 'tortas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670427781/recipes-app/koq5oh4qyt2wnxtxgujv.png',
    },
    {
      title: 'torta',
      mainTitle: 'de banano',
      portion_size: '8',
      preparation_minutes: '28',
      difficulty: 'fácil',
      category: 'tortas',
      score: '4.9',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670427781/recipes-app/n18f2ugk5wv1jxk1pt3m.png',
    },
    {
      title: 'pastel',
      mainTitle: 'de queso',
      portion_size: '8',
      preparation_minutes: '22',
      difficulty: 'media',
      category: 'tortas',
      score: '5',
      favorite: true,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670427781/recipes-app/mkp7ez7gtj5sqwytjoic.png',
    },
    {
      title: 'leche',
      mainTitle: 'volteada',
      portion_size: '8',
      preparation_minutes: '35',
      difficulty: 'difícil',
      category: 'tortas',
      score: '4.8',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670427781/recipes-app/nbdffrv6dr0xcbbposaw.png',
    },
    {
      title: 'kuchen',
      mainTitle: 'de nuez',
      portion_size: '8',
      preparation_minutes: '25',
      difficulty: 'difícil',
      category: 'tortas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670427781/recipes-app/lzwkfsd9tzhesd8l9luc.png',
    },
    {
      title: 'classic',
      mainTitle: 'burguer',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'comida_rapida',
      score: '5',
      favorite: true,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670434354/recipes-app/rmiatv7pdsilqgwr1jpk.png',
    },
    {
      title: 'perro',
      mainTitle: 'caliente',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'comida_rapida',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670434354/recipes-app/qkjficbtrvymrookluh6.png',
    },
    {
      title: 'lamb',
      mainTitle: 'sandwich',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'comida_rapida',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670434354/recipes-app/vi0lk8zfnc5q9crsiyz7.png',
    },
    {
      title: 'mix',
      mainTitle: 'principito',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'infantil',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670435830/recipes-app/tawudlt2p1rekgc22hgg.png',
    },
    {
      title: 'waffle',
      mainTitle: 'dog',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'infantil',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670435830/recipes-app/upnryjwhxfezbssrvqmu.png',
    },
    {
      title: 'playa',
      mainTitle: 'house',
      portion_size: '1 ración',
      preparation_minutes: '25',
      difficulty: 'media',
      category: 'infantil',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670435830/recipes-app/znbn1w0csypayt0ow7oj.png',
    },
    {
      title: 'sopa',
      mainTitle: 'de tomate',
      portion_size: '1 ración',
      preparation_minutes: '20',
      difficulty: 'fácil',
      category: 'sopas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670437303/recipes-app/gwqiyvoew9ingcdd0yyu.png',
    },
    {
      title: 'sopa',
      mainTitle: 'de frijol',
      portion_size: '1 ración',
      preparation_minutes: '20',
      difficulty: 'fácil',
      category: 'sopas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670437303/recipes-app/hxolbmhgkesgs7jsxaev.png',
    },
    {
      title: 'sopa',
      mainTitle: 'de lentejas',
      portion_size: '1 ración',
      preparation_minutes: '20',
      difficulty: 'fácil',
      category: 'sopas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670437303/recipes-app/je2vp8mgj6jcyxanfm9t.png',
    },
    {
      title: 'sopa',
      mainTitle: 'de guisantes',
      portion_size: '1 ración',
      preparation_minutes: '20',
      difficulty: 'fácil',
      category: 'sopas',
      score: '5',
      favorite: false,
      image:
        'https://res.cloudinary.com/dskdfhycu/image/upload/v1670437303/recipes-app/xzadsaou0a5fnv2jucf2.png',
    },
  ],
};
