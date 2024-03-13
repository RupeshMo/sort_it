class GamesController < ApplicationController

  def show
    @gameTiming = params[:gameTiming]
  end

end