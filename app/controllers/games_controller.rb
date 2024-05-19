class GamesController < ApplicationController

  def show
  end

  def index
  end

  def create
    @game = Game.new(require_params)
    if @game.save
      # response.headers['Location'] = '/unicorns'
      # render json: {status: 302}
      # puts request.body.read;
      redirect_to '/unicorns'
      # respond_to do |format|
      #   format.json {render json: {success: "Yes"}}
      # end
      #   # format.json { render json: {
      #   #   hellow: "Hi"
      #   # } m
      # }
    elsif @game.player_name == Game.find_by(player_name: params[:game][:player_name]).player_name
      game_to_update = Game.find_by(player_name: params[:game][:player_name], mode: params[:game][:mode])
      if @game.gametime < game_to_update.gametime
        game_to_update.update_attribute(:gametime, params[:game][:gametime])
      end
    end   
  end 

  private

  def require_params
    params.require(:game).permit(:gametime, :player_name, :mode)
  end


end