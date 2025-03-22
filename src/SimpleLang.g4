grammar SimpleLang;

prog: expression EOF;

expression
    : expression op=('*'|'/'|'%') expression  // Note: Reordered for proper precedence
    | expression op=('+'|'-') expression
    | INT
    | '(' expression ')'
    ;

INT: [0-9]+;
WS: [ \t\r\n]+ -> skip;