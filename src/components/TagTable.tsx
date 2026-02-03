import { useQuery } from "@apollo/client";
import { IconTag } from "@tabler/icons-react";
import { useMemo } from "react";
import { Link } from "react-router";
import { Col, Row } from "reactstrap";
import { TagEntity } from "../gql/graphql";
import { TAGS_FOR_SEARCHBAR } from "../queries";
import { FullPageSpinner } from "./FullPageSpinner";

export const TagTable = () => {

  const { data: tags, loading } = useQuery(TAGS_FOR_SEARCHBAR);

  const sortedTags = useMemo(() => {
    const output = [ ...(tags?.tags?.data ?? []) ];
    output.sort((a, b) => a.attributes?.titel?.localeCompare(b.attributes?.titel ?? '') ?? 0);
    return output;
  }, [ tags?.tags?.data ])

  if (loading) return <FullPageSpinner />

  const thirdOfLength = Math.floor(sortedTags.length / 3)

  return (
    <Row>
      <Col xs={12} lg={4}>
        {sortedTags
          ?.slice(0, thirdOfLength)
          ?.map(t => <TagEntry t={t} />)
        }
      </Col>
      <Col xs={12} lg={4}>
        {sortedTags
          ?.slice(thirdOfLength, 2 * thirdOfLength)
          ?.map(t => <TagEntry t={t} />)
        }
      </Col>
      <Col xs={12} lg={4}>
        {sortedTags
          ?.slice(2 * thirdOfLength, -1)
          ?.map(t => <TagEntry t={t} />)
        }
      </Col>
    </Row>
  )
}

const TagEntry = (props: {
  t: TagEntity | undefined
}) => {
  return (
    <Link className="link-unstyled" to={`/tag/${props.t?.id}`}>
      <div className="tag-entry">
        <div>
          <IconTag />
        </div>
        <div>
          {props.t?.attributes?.titel}
        </div>
      </div>
    </Link>
  )
}