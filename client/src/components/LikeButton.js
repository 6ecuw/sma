import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import { LIKE_POST_MUTATION } from '../utils'

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  const heartButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  )

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {heartButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
}

export default LikeButton
