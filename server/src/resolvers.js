const journeys = [
    {
        id: 1,
        departureTime: "2021-05-31T23:57:25",
        returnTime: "2021-06-01T00:05:46",
        departureStation: {
            id: 94,
            address: "Laajalahden aukio",
            journeysStartingFrom: 1,
            journeysEndingAt: 0
        },
        returnStation: {
            id: 100,
            address: "Teljäntie",
            journeysStartingFrom: 0,
            journeysEndingAt: 1
        },
        coveredDistance: 2043,
        duration: 500
    }
]

/*
 * 2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500
 2021-05-31T23:56:59,2021-06-01T00:07:14,082,Töölöntulli,113,Pasilan asema,1870,611
 2021-05-31T23:56:44,2021-06-01T00:03:26,123,Näkinsilta,121,Vilhonvuorenkatu,1025,399
 2021-05-31T23:56:23,2021-06-01T00:29:58,004,Viiskulma,065,Hernesaarenranta,4318,2009
 2021-05-31T23:56:11,2021-06-01T00:02:02,004,Viiskulma,065,Hernesaarenranta,1400,350
 *
 * */
