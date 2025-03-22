import { initialise } from "conductor/dist/conductor/runner/util/";
import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { CharStream, CommonTokenStream } from 'antlr4ng';
import { SimpleLangLexer } from './parser/src/SimpleLangLexer';
import { SimpleLangParser } from './parser/src/SimpleLangParser';
import { SimpleLangEvaluatorVisitor } from './EvaluatorVisitor';

export class SimpleLangEvaluator extends BasicEvaluator {
    private executionCount: number;
    private visitor: SimpleLangEvaluatorVisitor;

    constructor(conductor: IRunnerPlugin) {
        super(conductor);
        this.executionCount = 0;
        this.visitor = new SimpleLangEvaluatorVisitor();
    }

    async evaluateChunk(chunk: string): Promise<void> {
        this.executionCount++;
        try {
            // Create the lexer and parser
            const inputStream = CharStream.fromString(chunk);
            const lexer = new SimpleLangLexer(inputStream);
            const tokenStream = new CommonTokenStream(lexer);
            const parser = new SimpleLangParser(tokenStream);

            // Parse the input
            const tree = parser.prog();

            // Evaluate the parsed tree
            const result = this.visitor.visit(tree);

            // Send the result to the REPL
            this.conductor.sendOutput(`Result of expression: ${result}`);
        } catch (error) {
            // Handle errors and send them to the REPL
            if (error instanceof Error) {
                this.conductor.sendOutput(`Error: ${error.message}`);
            } else {
                this.conductor.sendOutput(`Error: ${String(error)}`);
            }
        }
    }
}

const {runnerPlugin, conduit} = initialise(SimpleLangEvaluator);
