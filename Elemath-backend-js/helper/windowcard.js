// helper/windowcard.js
// Generator for grade 5–6 math questions with 'input answer' quiz output.

const OP = {
    ADD: 'addition',
    SUB: 'subtraction',
    MUL: 'multiplication',
    DIV: 'division',
};

const OP_SYMBOL = {
    [OP.ADD]: '+',
    [OP.SUB]: '−',
    [OP.MUL]: '×',
    [OP.DIV]: '÷',
};

function normalizeDifficulty(input) {
    if (typeof input === 'number') {
        if (input <= 1) return 'easy';
        if (input === 2) return 'medium';
        return 'hard';
    }
    const s = String(input || '').toLowerCase().trim();
    if (['e', 'easy', 'beginner', 'basic'].includes(s)) return 'easy';
    if (['m', 'med', 'medium', 'normal'].includes(s)) return 'medium';
    if (['h', 'hard', 'difficult', 'advanced'].includes(s)) return 'hard';
    return 'medium';
}

function normalizeOperation(input) {
    const s = String(input || '').toLowerCase().trim();
    if (['add', 'addition', '+', 'plus'].includes(s)) return OP.ADD;
    if (['sub', 'subtract', 'subtraction', '-', 'minus'].includes(s)) return OP.SUB;
    if (['mul', 'multiply', 'multiplication', '*', 'x', '×', 'times'].includes(s)) return OP.MUL;
    if (['div', 'divide', 'division', '/', '÷'].includes(s)) return OP.DIV;
    if (['mix', 'mixed', 'random', 'any'].includes(s)) return 'mixed';
    return 'mixed';
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
    return arr[randInt(0, arr.length - 1)];
}

function rangesFor(op, difficulty) {
    switch (op) {
        case OP.ADD:
        case OP.SUB:
            if (difficulty === 'easy') return { a: [100, 999], b: [100, 999] };
            if (difficulty === 'medium') return { a: [1000, 9999], b: [1000, 9999] };
            return { a: [5000, 99999], b: [1000, 99999] };
        case OP.MUL:
            if (difficulty === 'easy') return { a: [2, 9], b: [2, 9] };
            if (difficulty === 'medium') return { a: [10, 50], b: [2, 12] };
            return { a: [50, 99], b: [10, 20] };
        case OP.DIV:
            if (difficulty === 'easy') return { divisor: [2, 9], quotient: [2, 20] };
            if (difficulty === 'medium') return { divisor: [2, 12], quotient: [10, 50] };
            return { divisor: [5, 20], quotient: [20, 99] };
        default:
            return { a: [10, 99], b: [10, 99] };
    }
}

function makeAddition(difficulty) {
    const { a, b } = rangesFor(OP.ADD, difficulty);
    const x = randInt(a[0], a[1]);
    const y = randInt(b[0], b[1]);
    return buildProblem(x, y, OP.ADD, difficulty, x + y);
}

function makeSubtraction(difficulty) {
    const { a, b } = rangesFor(OP.SUB, difficulty);
    let x = randInt(a[0], a[1]);
    let y = randInt(b[0], b[1]);
    const allowNegative = difficulty === 'hard';
    if (!allowNegative && y > x) [x, y] = [y, x];
    return buildProblem(x, y, OP.SUB, difficulty, x - y);
}

function makeMultiplication(difficulty) {
    const { a, b } = rangesFor(OP.MUL, difficulty);
    const x = randInt(a[0], a[1]);
    const y = randInt(b[0], b[1]);
    return buildProblem(x, y, OP.MUL, difficulty, x * y);
}

function makeDivision(difficulty) {
    const { divisor, quotient } = rangesFor(OP.DIV, difficulty);
    const q = randInt(quotient[0], quotient[1]);
    const d = randInt(divisor[0], divisor[1]);
    const dividend = q * d;
    return buildProblem(dividend, d, OP.DIV, difficulty, q);
}

function buildProblem(x, y, op, difficulty, answer) {
    const symbol = OP_SYMBOL[op];
    return {
        id: `${op}:${difficulty}:${x}:${y}:${Math.random().toString(36).slice(2, 8)}`,
        operation: op,
        difficulty,
        operands: [x, y],
        question: `${x} ${symbol} ${y} = ?`,
        answer,
    };
}

function makeOne(op, difficulty) {
    switch (op) {
        case OP.ADD: return makeAddition(difficulty);
        case OP.SUB: return makeSubtraction(difficulty);
        case OP.MUL: return makeMultiplication(difficulty);
        case OP.DIV: return makeDivision(difficulty);
        default: return makeAddition(difficulty);
    }
}

/**
 * Generate raw math problems.
 */
function generateQuestions(difficulty, operation, count = 10) {
    const diff = normalizeDifficulty(difficulty);
    const op = normalizeOperation(operation);
    const n = Math.max(1, Math.min(500, Number.isFinite(count) ? Math.floor(count) : 10));
    const opsPool = op === 'mixed' ? [OP.ADD, OP.SUB, OP.MUL, OP.DIV] : [op];
    const out = [];
    const seen = new Set();

    while (out.length < n) {
        const chosenOp = pickRandom(opsPool);
        const problem = makeOne(chosenOp, diff);

        const key =
            chosenOp === OP.ADD || chosenOp === OP.MUL
                ? `${chosenOp}:${diff}:${[...problem.operands].sort((a, b) => a - b).join(',')}`
                : `${chosenOp}:${diff}:${problem.operands.join(',')}`;

        if (seen.has(key)) continue;
        seen.add(key);
        
        const problemObject = {
            q1: problem.operands[0].toString(),
            q2: problem.operands[1].toString(),
            operation: OP_SYMBOL[chosenOp],
            question: problem.question
        };
        
        out.push({ ...problem, problem: problemObject });
    }
    return out;
}

/**
 * Build quiz with only 'input answer' questions.
 */
function buildQuiz(difficulty, operation, count = 10) {
    const problems = generateQuestions(difficulty, operation, count);

    if (!problems || !Array.isArray(problems)) {
        throw new Error("generateQuestions did not return a valid array");
    }
    console.log(problems);
    return {
        questions: problems.map(p => ({
            topic: p.operation,
            question: p.problem,
            type: 'input answer',
            answerType: '',
            story: '',
            options: [],
            answer: String(p.answer),
        }))
    };
}


module.exports = {
    OPERATIONS: OP,
    generateQuestions,
    buildQuiz,
};
