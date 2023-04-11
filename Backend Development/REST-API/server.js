import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);

//middleware
app.use(express.json());

let students = [
    { id: "1", name: "Fred", age: 16},
    { id: "2", name: "Michael", age: 17},
    { id: "3", name: "Kyle", age: 14}
];




//create endpoint
app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    res.send((student) ? student : res.status(404).send('Student not found'));
});

app.post('/api/students', (req, res) => {
    if (!req.body.name) res.status(400).send('Name is required');
    console.log(req.body.name);
    const student = {
        "id": students.length + 1,
        "name": req.body.name,
        "age": req.body.age
    };

    students.push(student);
    res.send(student);
});

app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    res.send((student) ? student : res.status(404).send('Student not found'));

    student.name = req.body.name;
    student.age = req.body.age;
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    res.send((student) ? student : res.status(404).send('Student not found'));

    const index = students.indexOf(student);
    students.splice(index, 1);
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// Live reload
let currSize = fs.statSync('server.js').size;
let lastSize = fs.statSync('server.js').size;
setInterval(() => {
    currSize = fs.statSync('server.js').size;
    if (lastSize != currSize) {
        console.log('App edited! Reloading...');
        process.exit();
    }
    lastSize = currSize;
}, 1000);