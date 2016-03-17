var mongoose = (require('./mongodb')).mongoose;

//name ����
var channelListSchema = new mongoose.Schema({
    game_id : Number,
    game_platform: Number,
    channel_id: Number,
    channel_name: String
});

exports.ChannelList = mongoose.model('ChannelList',channelListSchema);