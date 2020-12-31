import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'

function PostCard({
  post: { id, body, username, createdAt, commentCount, likeCount },
}) {
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
        <Button
          color="red"
          icon="heart"
          label={{
            basic: true,
            color: 'red',
            pointing: 'left',
            content: likeCount,
          }}
        />
        <Button
          basic
          color="blue"
          icon="comment"
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: commentCount,
          }}
        />
      </Card.Content>
    </Card>
  )
}
export { PostCard }
export default PostCard
