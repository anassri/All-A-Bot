# All-A-Bot
*By Ammar Nassri, Ivan Roth, Matt Ramotar, Sam Holt - [Visit All-A-Bot](https://all-a-bot.herokuapp.com/)*

## Table of Contents:
* [All-A-Bot Summary](#All-A-Bot-summary)
* [Technologies Used](#technologies-used)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Next Steps](#next-steps)

## All-A-Bot Summary
All-A-Bot is a custom [Discord](https://discord.com/) bot generator. AAB is built to make it simple for Discord members to create bots, with multiple commands, for their Discord servers.

![All-A-Bot gif](./documentation/all-a-bot.gif)

## Technologies Used
All-A-Bot is a full-stack application built with a React frontend and an Python.Flask backend. Most of the logic happens in the React frontend. Incorporating [Material UI framework](https://material-ui.com/) for the styling.

The frontend is served by the backend, which responds to requests, and grabs data from the PostgreSQL database.

## Frontend Overview

All-A-Bot is a frontend heavy application. It utilizes React to create a dynamic and rich user experience. Here are the technologies used to make this application.

### React

All-A-Bot is a React application. It utilizes its higher order components for a dynamic and efficient rendering. The app extensively uses the technologies and libraries of the React ecosystem.


In the main page that displays all campaigns, the app generates the campaign cards dynamically. The code snippet below renders cards.

```js
<Grid   container 
        direction="row"
        justify="center"
        spacing={3}>
        {campaigns.length
        ? campaigns.map((campaign) => { if(!campaign.isExpired) return <Grid key={campaign.id} item xs={4}>
                <CampaignItems  campaign={campaign} /></Grid> })
        : <h1 className="no-campaigns-container">No Active Campaigns Found.</h1>
        }
</Grid>
```

The code above utilizes the `CampaignItems` component to dynamically generate those cards. Here's what the `CampaignItems` looks like under the hood:

```js
<Card className={`${classes.root} card-container`}>
    <CardActionArea>
        <Link key={campaign.id} to={`/campaign/${campaign.id}`} className={classes.text}>
            <CardMedia
                className={classes.media}
                image={campaign.image}
                title={campaign.name}
            />
        <CardContent>
        
            <Typography gutterBottom variant="h5" component="h2" >
                {campaign.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                {campaign.summary}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p" style={{marginTop: 10}}>
                By <span style={{ fontWeight: "bold" }}>{campaign.User.firstName} {campaign.User.lastName}</span> for <span style={{ fontWeight: "bold" }}>{campaign.Charity.name}</span>
            </Typography>
        </CardContent>
        <CardActions className="stats-container">
            <div className="bid time-left">
                <div className="current-bid">
                    <Typography gutterBottom variant="body1" component="h2">
                        <DetermineBid campaign={campaign} />
                    </Typography>
                </div>
                <div className="remaining counter progress-bar">
                    <Typography gutterBottom variant="body1" component="h2">
                        <DetermineTimeRemaining isExpired={campaign.isExpired} closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                    </Typography>
                    <div className={classes.progress}>
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                </div>
            </div>
        </CardActions>
        <CardActions className="items-other-info-container">
            <div className={`${classes.bottom} items-other-info`}>
                <Typography variant="body1" color="textSecondary" component="p">
                    {campaign.Category.name}
                </Typography>
                <div className="location">
                    <div className="nav-icon"><i className="fas fa-map-marker-alt"></i></div>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {campaign.User.location}
                    </Typography>
                </div>
            </div>
        </CardActions>
        </Link>
    </CardActionArea>

</Card>
```
`CampaignItems` will destructure the props to use the information contained and insert them where they need to be in the layout. All-A-Bot takes advantage of Material-UI's powerful components to display the campaign information properly in a card layout.

The component will also determine the time remaining till the campaign closes and displays it in a human readable format. In addition, the app will find out the current bid and displays it on the card.

![Sample card](./graphics/sample-campaign.png)

### Redux

[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) were used to manage the application's state and make fetch requests to the backend.

Campaigns' information are fetched and kept in the Redux store. While fetching all campaigns may lengthens the initial load time, it provides a smoother experience once that load is complete. Pagination is also an option for future extensive use.

Redux paves the way for new features to be integrated easily.

### CSS & Material UI

All-A-Bot incorporates nicely with Material-UI. A mockup was created to determine the look and feel of the app before diving into developement. The app was designed to utilize Material-UI's components for a smoother look and nicer user experience.

#### Original Mockup
![original mockup](./graphics/website-mockup.jpg)

#### End Result
![end-result mockup](./graphics/end-result.png)

### Date-fns
The [Date-fns](https://date-fns.org/) library is used to make time easier to read with words instead of the datetime format JavaScript provides.

## Backend Overview
All-A-Bot uses an Express server with PostgreSQL as the database. The backend is fairly simple in comparison to the frontend. It sends the frontend to the client, receives requests and sends data to the frontend. Here is a breakdown of the backend technologies.

### Express
[Express](https://expressjs.com/) was the obvious choice as All-A-Bot's server-side framework. Express makes it easy to implement the light-weight responsibilities of All-A-Bot' server. 

### PostgreSQL
[PostgreSQL](https://www.postgresql.org/) is used as the project's database. Its simplicity and flexibility makes it an obvious choice amongst other SQL databases. 

## Next Steps
All-A-Bot is a living app. It will always have new features added to it to continue to improve it for best user experience.

### Additional Features
A few features that are in the works:
* Check out, once a user has won a campaign, the need for the user to checkout and make a payment is then necessary.
* contributor vs bidder separate dashboards.

### Conclusion
All-A-Bot is my first solo app with React and Express. I've had a lot fun building it and I've learned a lot during the process. 

I've always wanted to build apps that benefits people and I've always enjoyed having unique pieces of art. The thought to combine both was intriguing. I wanted a way to benefit charities and allow bidders to also own a nice piece of work. That's where the inspiration behind All-A-Bot came from.
