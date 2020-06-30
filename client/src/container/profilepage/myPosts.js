import React, { useState, useEffect } from 'react'
import { Paper, Grid, Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'
const useStyles = makeStyles((theme) => ({
    cardMedia: {
        height: 200,
        width: '100%',
        objectFit: 'fill',
    }, root: {
        cursor: 'pointer'
    }
}))
const MyPosts = (props) => {
    const classes = useStyles()
    const { post } = props
    const [imageFile, setImageFile] = useState('')
    useEffect(() => {
        setImageFile(arrayBufferToBase64(post.imgFile && post.imgFile.data.data))
    }, [])

    return (
        <Paper className={classes.root}>
            <Card>
                <CardContent>
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt="item img"
                        image={`data:image/jpeg;base64,${imageFile}`}
                        //image={postImagePath}
                        title={post.title}
                    />

                </CardContent>
            </Card>
        </Paper>
    )
}

export default MyPosts