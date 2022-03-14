export interface RequiredRuleProps {
  value: boolean,
  message: string,
}

export interface PatternRuleProps {
  value: RegExp,
  message: string
}