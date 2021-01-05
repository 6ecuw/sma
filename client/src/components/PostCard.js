import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

function PostCard({
  post: { id, body, username, createdAt, commentCount, likeCount, likes },
}) {
  const { user } = useContext(AuthContext)

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`post/${id}`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          basic
          color="blue"
          icon="comment"
          as={Link}
          to={`post/${id}`}
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: commentCount,
          }}
        />
        {user && user.username === username && (
          <Button color="red" icon="trash" floated="right" />
        )}
      </Card.Content>
    </Card>
  )
}
export { PostCard }
export default PostCard
