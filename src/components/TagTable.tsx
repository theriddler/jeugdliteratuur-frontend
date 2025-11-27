import { useQuery } from "@apollo/client"
import { TAGS_FOR_SEARCHBAR } from "../queries"
import { FullPageSpinner } from "./FullPageSpinner";
import { IconTag } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export const TagTable = () => {
  const navigate = useNavigate();

  const { data: tags, loading } = useQuery(TAGS_FOR_SEARCHBAR);

  if (loading) return <FullPageSpinner />

  return (
    <table>
      <tbody>
        {tags?.tags?.data?.map(t => (
          <tr onClick={() => navigate(`/tag/${t.id}`)}>
            <td style={{ width: '50px' }}>
              <IconTag />
            </td>
            <td className="py-2">
              {t.attributes?.titel}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}