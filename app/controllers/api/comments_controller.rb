class Api::CommentsController < ApplicationController
  skip_before_action :authorize, only: %i[show index]

  def index
    render json: Comment.all
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment, status: :ok
  end

  def create
    comment = Comment.create!(comment_params)
    render json: comment, status: :created
  end

  def destroy
    comment = comment.find_by(id: params[:id])
    comment.destroy
    head :no_content
  end

  private

  def comment_params
    params.permit(:user_id, :ticket_id, :message)
  end
end
