import { useParams } from "react-router"
import { Lemmas } from "../components/Lemmas";

export const Level = () => {
  const { levelId } = useParams();

  return (
    <div>
      <Lemmas levelId={levelId} />
    </div>
  )
}