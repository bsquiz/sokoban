/*
b = wall
w = wall bottom
t = wall top
g = goal
p = player
x = box
c = cleared
space = free
*/
const levels = [
    [
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b'],
        ['b', 'p', 'x', ' ', ' ', ' ', ' ', ' ', 'g', 'b'],
        ['b', 't', 't', 't', 't', 't', 't', 't', 't', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],
    [
        ['b', 'b', 'b', 'w', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'p', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', ' ', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', ' ', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', ' ', 'w', 'w', 'w', 'w', 'w', 'b'],
        ['b', 'b', 'b', 'x', 'x', ' ', ' ', ' ', 'g', 'b'],
        ['b', 'b', 'b', ' ', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', ' ', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'g', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],
    [
        ['b', 'b', 'w', 'w', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', ' ', ' ', 'w', 'w', 'w', 'b', 'b', 'b'],
        ['b', 'b', ' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b'],
        ['b', 'b', 'g', 't', 'x', 'x', ' ', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'p', ' ', ' ', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'w', ' ', 't', 't', 'b', 'b', 'b'],
        ['b', 'b', 'b', ' ', ' ', 'w', 'w', 'w', 'b', 'b'],
        ['b', 'b', 'b', ' ', ' ', ' ', ' ', ' ', 'g', 'b'],
        ['b', 'b', 'b', 't', 't', 't', 't', 't', 't', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],
    [
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'w', 'w', 'w', 'w', 'w', 'b', 'b', 'b'],
        ['b', 'b', ' ', ' ', ' ', ' ', ' ', 'b', 'b', 'b'],
        ['b', 'b', ' ', 'g', 'x', 'g', ' ', 'b', 'b', 'b'],
        ['b', 'b', ' ', 'x', 'w', 'x', ' ', 'b', 'b', 'b'],
        ['b', 'b', 'g', ' ', 'x', 'g', ' ', 'b', 'b', 'b'],
        ['b', 'b', ' ', ' ', 'p', ' ', ' ', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],
    [
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'w', 'w', 'w', 'b', 'b'],
        ['b', 'w', 'w', 'w', 'w', ' ', ' ', ' ', 'b', 'b'],
        ['b', 'p', 'x', ' ', 'g', 'x', ' ', ' ', 'b', 'b'],
        ['b', ' ', ' ', ' ', 'w', ' ', ' ', ' ', 'b', 'b'],
        ['b', ' ', ' ', ' ', 'g', ' ', ' ', ' ', 'b', 'b'],
        ['b', 't', 't', 't', 't', 't', 't', 't', 'b', 'b'],
        ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ],
    [
        ['b', 'b', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'b'],
        ['b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
        ['b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
        ['b', 'w', ' ', 'b', 'w', 'b', 'g', ' ', ' ', 'b'],
        ['b', ' ', 'g', 'w', 'g', 'w', ' ', ' ', ' ', 'b'],
        ['b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
        ['b', ' ', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'b'],
        ['b', 'p', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b'],
        ['b', 'g', 't', 'g', 't', 'g', 't', 't', 't', 'b'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ]
]
