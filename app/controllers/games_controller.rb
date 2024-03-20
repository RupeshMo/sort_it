class GamesController < ApplicationController

  def show
    @games = Game.all
  end

  def create
    @game = Game.new(require_params)
    if @game.save
      # response.headers['Location'] = '/unicorns'
      # render json: {status: 302}
      # puts request.body.read;
      # redirect_to '/unicorns'
      # respond_to do |format|
      #   format.json {render json: {success: "Yes"}}
      # end
      #   # format.json { render json: {
      #   #   hellow: "Hi"
      #   # } 
      # }
    else 
        redirect_to '/'
    end
  end

  private

  def require_params
    params.require(:game).permit(:gametime, :player_name, :objective_sequence)
  end


end