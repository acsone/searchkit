const assign = require("lodash/assign")

export interface MultiMatchOptions {
  fields:Array<string>,
  type?:string,
  tie_breaker?:number,
  operator?:string,
  minimum_should_match?:string,
  analyzer?:string
}

export function MultiMatchQuery(query, options:MultiMatchOptions){
  if(!query){
    return
  }

  return {
    function_score:{
      query: {
        multi_match:assign({query}, options)
      },
      functions: [
        {
          gauss: {
            publication_date: {
              origin: "now",
              offset: "30d",
              scale: "500d",
              decay: 0.1
            }
          }
        }
      ],
      max_boost: 1000,
      score_mode: "multiply",
      boost_mode: "multiply",
      min_score: 0
    }
  }
}
