import { useQuery } from "@apollo/client"
import { INTRODUCTION } from "../queries"

export const Homepage = () => {
  const { data } = useQuery(INTRODUCTION)
  console.log(data)

  return (
    <div>
      <h5>Homepage</h5>
      {data?.introduction?.Text}
    </div>
  )
}