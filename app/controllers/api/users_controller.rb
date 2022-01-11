class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: %i[create index]

  def show
    user = User.find_by(id: session[:user_id])
    render json: user
  end
  
  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  def user_params
    params.permit(:email, :password, :first_name, :last_name, :user)
  end
end
