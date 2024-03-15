class GamesController < ApplicationController



  def show
    @games = Game.all
    
  end

  def create
    @game = Game.new(require_params)
    if @game.save
      redirect_to unic_path
      return 
    else 
      redirect_to '/'
    end
  end

  private

  def require_params
    params.require(:game).permit(:gametime, :player_name, :objective_sequence)
  end


end