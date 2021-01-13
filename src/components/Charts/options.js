module.exports={
    defs:
        [
        {
            id: 'dots',
            type: 'patternDots',
            background: "#81ae19",
            color: 'rgba(255, 255, 255, 0.3)',
            size: 1,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color:  "#f1e15b",
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        },
        {
            id: 'squares',
            type: 'patternSquares',
            background: "#f47560",
            color: 'rgba(255, 255, 255, 0.3)',
            
        },
        {
            id: 'dots2',
            type: 'patternDots',
            background: "#61cdbb",
            color: 'rgba(255, 255, 255, 0.3)',
            size: 2,
            padding: 1,
            stagger: true
        },
    ],


    fill:[
        {
            match: {
                id: 'gas'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'tires'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'repair'
            },
            id: 'dots2'
        },
        {
            match: {
                id: 'food'
            },
            id: 'squares'
        }                    
    ] 
}