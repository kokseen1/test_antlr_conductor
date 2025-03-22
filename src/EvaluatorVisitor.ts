import { AbstractParseTreeVisitor } from 'antlr4ng';
import { ExpressionContext, ProgContext } from './parser/SimpleLangParser';
import { SimpleLangVisitor } from './parser/SimpleLangVisitor';

export class SimpleLangEvaluatorVisitor extends AbstractParseTreeVisitor<number> implements SimpleLangVisitor<number> {
    // Visit a parse tree produced by SimpleLangParser#prog
    visitProg(ctx: ProgContext): number {
        return this.visit(ctx.expression());
    }

    // Visit a parse tree produced by SimpleLangParser#expression
    visitExpression(ctx: ExpressionContext): number {
        if (ctx.getChildCount() === 1) {
            // INT case
            return parseInt(ctx.getText());
        } else if (ctx.getChildCount() === 3) {
            if (ctx.getChild(0).getText() === '(' && ctx.getChild(2).getText() === ')') {
                // Parenthesized expression
                return this.visit(ctx.getChild(1) as ExpressionContext);
            } else {
                // Binary operation
                const left = this.visit(ctx.getChild(0) as ExpressionContext);
                const op = ctx.getChild(1).getText();
                const right = this.visit(ctx.getChild(2) as ExpressionContext);

                switch (op) {
                    case '+': return left + right;
                    case '-': return left - right;
                    case '*': return left * right;
                    case '/':
                        if (right === 0) {
                            throw new Error("Division by zero");
                        }
                        return left / right;
                    default:
                        throw new Error(`Unknown operator: ${op}`);
                }
            }
        }
        
        throw new Error(`Invalid expression: ${ctx.getText()}`);
    }

    // Override the default result method from AbstractParseTreeVisitor
    protected defaultResult(): number {
        return 0;
    }
    
    // Override the aggregate result method
    protected aggregateResult(aggregate: number, nextResult: number): number {
        return nextResult;
    }
}
