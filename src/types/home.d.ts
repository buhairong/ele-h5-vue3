export interface ISearchRecomment {
  value: number
  label: string
}

export interface ISearchResult {
  type: number
  label: string
  resultCount: nunber
}

export interface ISearchResultList {
  list: ISearchResult[]
}
