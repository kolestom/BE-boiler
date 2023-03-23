const x = {
    name: "AA",
    age: 18
  }
  
  const y = JSON.parse(JSON.stringify(x))

  const deepCopy = (a) => {
    return JSON.parse(JSON.stringify(a))
  }

  y.name = "B"
  
  console.log(x)