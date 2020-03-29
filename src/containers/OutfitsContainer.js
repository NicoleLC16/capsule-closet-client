import React, { useContext } from 'react'
import { StateContext, MethodContext, DispatchContext } from '../App'
import { Grid, makeStyles, Paper, Fab, Typography } from '@material-ui/core';
import OutfitCard from '../components/OutfitCard';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(3)
    }, 
  paper: {
    padding: theme.spacing(1),
  },
  extendedIconRight: {
    marginRight: '-90%',
  },
  extendedIcon: {
    marginTop: theme.spacing(1),
    width: '100%',
    height: '3vh'
  },
  iconText: {
    position: 'absolute'
  }
}))

export default function OutfitContainer({ history }){
  const { paper, root, extendedIcon, iconText, extendedIconRight } = useStyles()
  const { outfits } = useContext(StateContext)
  const { setEditMode, setSelectedOutfit, filterItemsByOutfit } = useContext(MethodContext)
  const { selectedOutfitDispatch } = useContext(DispatchContext)

  const handleEdit = (outfit) => {
    setEditMode(true)
    selectedOutfitDispatch({type: 'SET_OUTFIT', payload: outfit})

    // selectedOutfitDispatch({type: 'SET_OUTFIT', payload: {...outfit, items: filterItemsByOutfit(outfit)}})
    // setSelectedOutfit(outfit)
    history.push('/closet')
  }

  const renderOufits = () => {
    return outfits.map(outfit => {
      return (
        <Grid className={root} key={outfit.id} item xs={4} >
          <Paper className={paper}>
            <OutfitCard outfit={outfit} />
            <Fab 
            onClick={() => handleEdit(outfit)} 
            className={extendedIcon} 
            variant="extended" 
            color="secondary" 
            aria-label="edit">
              {/* <EditIcon className={extendedIconRight} /> */}
              <Typography className={iconText}>Edit {outfit.name}</Typography>
            </Fab>
          </Paper>
        </Grid>
      )
    })
  }

  return (
    <div className={root}>
        <Grid container spacing={3}>
          {renderOufits()}                            
        </Grid>                       
    </div>
  )
} 