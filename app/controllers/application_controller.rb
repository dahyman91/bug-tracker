class ApplicationController < ActionController::API
  include ActionController::Cookies\

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record_response

  before_action :authorize

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  private

  def render_not_found_response
    render json: { error: 'not found' }, status: :not_found
  end

  def invalid_record_response(invalid)
    render json: {errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
