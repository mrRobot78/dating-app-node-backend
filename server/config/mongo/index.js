import mongoose from 'mongoose';

export default function connectMongo() {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  // return new Promise((resolve, reject) => mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/chat`, {
  return new Promise((resolve, reject) => mongoose.connect('mongodb://tinder_chat_app:password786@ds151805.mlab.com:51805/tinder_chat_app', {
    useNewUrlParser: true,
  })
    .then(yes => resolve('conneted', yes))
    .catch(err => reject(`not connected${err}`)));
}
