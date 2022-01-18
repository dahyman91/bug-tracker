class Api::MembershipsController < ApplicationController

  def create
    membership = Membership.create!(membership_params)
    render json: membership, status: :created
  end

  def index
    render json: Membership.all
  end

  def show
    user = User.find(session[:user_id])
    membership = user.memberships.find_by(team_id: params[:id])
    render json: membership
  end

  def make_admin
    membership = Membership.where(user_id: params[:user_id]).where(team_id: params[:team_id])
    membership.update(is_admin?: true)
    render json: membership
  end

  def remove_admin
    membership = Membership.where(user_id: params[:user_id]).where(team_id: params[:team_id])
    membership.update(is_admin?: false)
    render json: membership
  end

  def check_admin
    membership = Membership.where(user_id: params[:user_id]).where(team_id: params[:team_id])
    render json: membership
  end

  def remove
    membership = Membership.where(user_id: params[:user_id]).where(team_id: params[:team_id])
    membership.first.destroy
    head :no_content
  end

  private

  def membership_params
    params.permit(:user_id, :team_id, :is_admin?)
  end
end
