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

All-A-Bot is a frontend heavy application. It utilizes React to create a dynamic and rich user experience. It also incorporate [DiscordJS](https://discord.js.org/#/), a Node.js module that allows for easiy interaction with the Discord API. Here are the technologies used to make this application.

### React

All-A-Bot is a React application. It utilizes its higher order components for a dynamic and efficient rendering. The app extensively uses the technologies and libraries of the React ecosystem.


In the Explore Bot page that displays all published bots, the app dynamically generates the list of bots that are fetched from the database. The code snippet below renders the list.

```js
{botsMatchingQuery.map((bot, i) => (
                <Box key={i}>
                  <ListItem
                    name={bot.name}
                    key={bot.id}
                    id={bot.id}
                    bot={bot}
                    description={bot.description}
                    username={bot.owner.username}
                    user={user}
                    bookmarkBotDispatch={bookmarkBotDispatch}
                    unbookmarkBotDispatch={unbookmarkBotDispatch}
                    loadBookmarksDispatch={loadBookmarksDispatch}
                    token={token}
                    style={{ textAlign: 'left' }}
                  />
                </Box>
))}
```

It uses the `botsMatchingQuery` variable that is saved in local state to then re-render the list of bots in case the user searches for a particular bot. The component will rely on updates to the local state instead of firing off a new fetch request to the server everytime a user searches for a bot.

The code below shows what the `ListItem` component does:

```js
<Grid key={id} item xs={12} className={classes.bot}>
      <i
        onClick={handleBookmark(bot.id)}
        className={
          bookmarks ? (bookmarks.some(b => b.id === bot.id) ? 'fas fa-bookmark fa-2x' : 'far fa-bookmark fa-2x') : ''
        }></i>
      <CardActionArea className={classes.action}>
        <div className={classes.content}></div>
        <Link to={`/bots/${id}`} style={{ color: 'inherit' }}>
          <Typography variant='h5' component='h2' style={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant='subtitle1' component='h2'>
            <div>
              {description}. By <span style={{ fontWeight: 'bold' }}>{username}</span>
            </div>
          </Typography>
        </Link>
      </CardActionArea>
      <div className={classes.content}>
        <div>
          <DownloadBtn bot={bot} />
        </div>
        <i
          onClick={handleOpenPopover}
          title='Share a Bot'
          className='fas fa-share-alt fa-lg'
          style={{ cursor: 'pointer', opacity: 0.7 }}
        />
        <Popover
          open={popoverIsOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          anchorPosition={{ top: 10, right: 50 }}
          onClose={handleClosePopover}
          PaperProps={{ classes: { root: classes.popover } }}>
          <div>
            <EmailShareButton url={`https://all-a-bot.herokuapp.com/bots/${id}`}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={`https://all-a-bot.herokuapp.com/bots/${id}`}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={`https://all-a-bot.herokuapp.com/bots/${id}`}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={`https://all-a-bot.herokuapp.com/bots/${id}`}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <RedditShareButton url={`https://all-a-bot.herokuapp.com/bots/${id}`}>
              <RedditIcon size={32} round={true} bgStyle={{ fill: '#F94503' }} />
            </RedditShareButton>
          </div>
        </Popover>
      </div>
    </Grid>
```

In addition to viewing the bot information, the app lets the user edit and share the bot to different social media platforms.

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
