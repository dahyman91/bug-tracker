class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :user_id
      t.string :ticket_id
      t.string :message

      t.timestamps
    end
  end
end
