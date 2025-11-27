import { useQuery } from "@apollo/client";
import { IconTag } from "@tabler/icons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { TAGS_FOR_SEARCHBAR } from "../queries";
import { FullPageSpinner } from "./FullPageSpinner";

export const TagTable = () => {
  const navigate = useNavigate();

  const { data: tags, loading } = useQuery(TAGS_FOR_SEARCHBAR);

  const sortedTags = useMemo(() => {
    const output = [ ...(tags?.tags?.data ?? []) ];
    output.sort((a, b) => a.attributes?.titel?.localeCompare(b.attributes?.titel ?? '') ?? 0);
    return output;
  }, [ tags?.tags?.data ])

  if (loading) return <FullPageSpinner />

  return (
    <table>
      <tbody>
        {sortedTags?.map(t => (
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