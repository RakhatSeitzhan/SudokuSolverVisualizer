 
const actions = [
    {
        type: 'await',
        text: 'Hey!',
        options: ["Hello!" , "Hi", "..."],
        timer: 3000
    },
    {
        type: 'await',
        text: "What can I give you today?",
        options: ["Americano" , "Latte", "Cappuccino"],
        timer: 1000
    },
    {
        type: 'proceed',
        text: "Okay!",
        timer: 1000
    },
    {
        type: 'await',
        text: "Hot or iced?",
        options: ["Hot" , "Iced please"],
        timer: 1000
    },
    {
        type: 'await',
        text: "Would you like some syrop?",
        options: ["Caramel" , "Vanilla", "Chocolate", "No, thank you!"],
        timer: 1500
    },
    {
        type: 'proceed',
        text: "Alright!",
        timer: 1000
    },
    {
        type: 'proceed',
        text: "Your order will be served in 4-5 minutes!",
        timer: 1000
    },
    {
        type: 'proceed',
        text: "You can proceed solving sudoku!",
        timer: 1000
    },
]

export default actions