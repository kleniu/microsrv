var data=[
  {
    _id: "7d7b0d3f998ac86b02eb8824d1bfb4c8",
    _rev: "1-ed7e8dbf34281604935fb721a185b024",
    date: "2021-02-22",
    time: "20:48:35",
    id: "1p1vw",
    desc: "watever you want",
  },
  {
    _id: "88b5dbdddfde02fe2ea2ae887d0c1d69",
    _rev: "1-13d07830831b29af8f56193c1b0690c3",
    date: "2021-02-22",
    time: "21:00:17",
    id: "9oyu2",
    desc: "123",
  },
  {
    _id: "8925f7600d214e27d30a50a3a8d4ee2c",
    _rev: "1-c937b413ff1aa875ec67185f0a90d1c4",
    date: "2021-02-22",
    time: "21:15:18",
    id: "2eui7",
    desc: "blablabl",
  },
  {
    _id: "8925f7600d214e27d30a50a3a8d5035a",
    _rev: "1-e719132b7e4e5580f6d726ad0aeb4561",
    date: "2021-02-22",
    time: "21:15:54",
    id: "on14z",
    desc: "kicha",
  },
  {
    _id: "e60cb0ca88e74e4b2e91385c247b4aa2",
    _rev: "1-7b6d1013c2197b7c720cf6d02cadb623",
    date: "2021-02-23",
    time: "14:41:10",
    id: "zq7fn",
    desc: "test text",
  },
  {
    _id: "ed07a1dd8fe9ee6660bfd1f358fbf2bf",
    _rev: "1-294b384c96d2cac674048d6299905187",
    date: "2021-02-22",
    time: "20:48:14",
    id: "m2h75",
    desc: "watever you want",
  },
];


var sortedData= data.sort(function (a, b){
    if (new Date(b.date)-new Date(a.date) !=0)
    {
        return new Date(b.date)-new Date(a.date)
    }
     else
     {
         return b.time.localeCompare(a.time)
     }
})
console.log(sortedData)
