// DARK MODE
const darkToggle = document.getElementById('dark-mode-toggle');
if(darkToggle) {
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
}

// LANGUAGE & LESSONS
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang') || 'html';

const editor = document.getElementById('code-editor');
const output = document.getElementById('output');
const languageTitle = document.getElementById('language-title');
const lessonTitle = document.getElementById('lesson-title');
const lessonInstructions = document.getElementById('lesson-instructions');

const lessons = {
    html: [
        {title:"HTML Lesson 1", instructions:"Create a heading that says 'Welcome to CodeStart'", code:"<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Your code here -->\n  </body>\n</html>"},
        {title:"HTML Lesson 2", instructions:"Add a paragraph that says 'Learning HTML is fun!'", code:"<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Welcome to CodeStart</h1>\n    <!-- Your paragraph here -->\n  </body>\n</html>"},
        {title:"HTML Lesson 3", instructions:"Add a list of 3 coding languages", code:"<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Languages</h1>\n    <!-- Your list here -->\n  </body>\n</html>"}
    ],
    css: [
        {title:"CSS Lesson 1", instructions:"Make the background lightblue", code:"body {\n  background-color: lightblue;\n}"},
        {title:"CSS Lesson 2", instructions:"Make headings white", code:"h1 {\n  color: white;\n}"},
        {title:"CSS Lesson 3", instructions:"Center your paragraph text", code:"p {\n  text-align: center;\n}"}
    ],
    js: [
        {title:"JS Lesson 1", instructions:"Show an alert saying 'Hello World!'", code:"alert('Hello World!');"},
        {title:"JS Lesson 2", instructions:"Log 'Learning JS' to console", code:"console.log('Learning JS');"},
        {title:"JS Lesson 3", instructions:"Change background color to yellow", code:"document.body.style.backgroundColor = 'yellow';"}
    ],
    python: [
        {title:"Python Lesson 1", instructions:"Print 'Hello World!'", code:"print('Hello World!')"},
        {title:"Python Lesson 2", instructions:"Print 2+3", code:"print(2+3)"},
        {title:"Python Lesson 3", instructions:"Print your name", code:"print('Your Name')"}
    ]
};

// LOAD LESSON
let currentLesson = 0;
if(editor) loadLesson(1);

function loadLesson(num) {
    currentLesson = num-1;
    const lesson = lessons[lang][currentLesson];
    lessonTitle.textContent = lesson.title;
    lessonInstructions.textContent = lesson.instructions;
    editor.value = lesson.code;
}

// RUN CODE
if(document.getElementById('run-btn')){
document.getElementById('run-btn').addEventListener('click', () => {
    const code = editor.value;

    if(lang === 'html' || lang === 'css'){
        output.srcdoc = code;
    } else if(lang === 'js'){
        output.srcdoc = `<script>${code}<\/script>`;
    } else if(lang === 'python'){
        output.srcdoc = `<pre id="python-output"></pre>`;
        Sk.configure({
            output: (text) => {
                const pre = output.contentDocument.body.querySelector('#python-output');
                pre.textContent += text;
            },
            read: (x) => {
                if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                    throw "File not found: '" + x + "'";
                return Sk.builtinFiles["files"][x];
            }
        });
        Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true))
        .catch(err => {
            const pre = output.contentDocument.body.querySelector('#python-output');
            pre.textContent += err.toString();
        });
    }
});
}

