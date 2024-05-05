class PostsController < ApplicationController
  
  def index
  end

  def show
    @games = Game.all
  end

end
