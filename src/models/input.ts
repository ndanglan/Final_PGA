export interface RequiredRuleProps {
  value: boolean,
  message: string,
}

export interface PatternRuleProps {
  value: RegExp,
  message: string
}

export interface GroupInputProps {
  value: string,
  name: string,
  group: string
}