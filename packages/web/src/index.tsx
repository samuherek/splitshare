import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AppProviders from './context';

// https://dribbble.com/shots/7598628-Wickret-Landing-Page-Interaction
// https://dribbble.com/shots/7024031-Product-Analytics-Reports
// https://dribbble.com/shots/7745803/attachments/441396?mode=media
// https://dribbble.com/shots/6833189-Tablet-Banking-App/attachments
// https://dribbble.com/shots/4723479-Fintech-Dashboard
// https://dribbble.com/shots/5496606-Agenda-Calendar
// https://dribbble.com/shots/6973667-CryptoBot-Overview/attachments
// https://dribbble.com/shots/7211356/attachments/203391?mode=media
// https://dribbble.com/shots/7201548-Credit-Report-Credit-Score/attachments/197529?mode=media
// https://dribbble.com/shots/8139561-Spendings-controller/attachments/559007?mode=media
// https://dribbble.com/shots/7066402-Credit-Limit-Increase-Mobile-banking-app
//

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root') as HTMLElement
);
