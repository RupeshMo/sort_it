class GamesController < ApplicationController

  def show

  end

  def player
    @game = Game.new
  end

  def create_name
    @game = Game.new(require_params_name)
    if @game.save

    else
      redirect_to '/'
    end
  end


  def index
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
      #   # } m
      # }
    else 
        redirect_to '/'
    end
  end

  private

  def require_params
    params.require(:game).permit(:gametime, :mode)
  end

  def require_params_name
    params.require(:game).permit(:player_name)
  end

end