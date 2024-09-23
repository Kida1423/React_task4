import Perfect_img from './../imges/Ed_perfect.jpeg'
import Ed_perfect from "./../musics/Ed_Sheeran-Perfect.mp3"

import Shawn_holding from  "./../musics/There's-Nothing-Holdin'-Me-Back.mp3"
import Holding from "./../imges/there's_nothing_holding.jpeg"

import Attention from  "./../musics/CharliePuth-Attention.ogg"
import  Attention_img from "./../imges/attention.png"

import Treat from  "./../musics/Shawn_Mendes-Treat-You-Better.ogg"
import Shawn_treat from "./../imges/treat_u_better.jpeg"

import Shape_you from  "./../musics/Shape-Of-You-Ed_Sheeran.flac"
import Shape from "./../imges/shape_of_you.jpeg"
const Data = [
    {
        id: 1,
        title: 'Perfect',
        artist: 'Ed sheeran',
        thumbnail: Perfect_img,
        src: Ed_perfect,
    },
    {
        id: 2,
        title: 'Attention',
        artist: 'Charlie Puth',
        thumbnail: Attention_img,
        src: Attention,
    },
    {
        id: 3,
        title: 'Treat you better',
        artist: 'Shawn Mendes',
        thumbnail: Shawn_treat,
        src: Treat,
    },
    {
        id: 4,
        title: 'There is Nothing Holdin Me',
        artist: ' Shawn Mendes',
        thumbnail: Holding,
        src: Shawn_holding,
    },
    {
        id: 5,
        title: 'Shape of you',
        artist: 'Ed sheeran',
        thumbnail: Shape,
        src: Shape_you,
    },
]

export default Data